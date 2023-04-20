import os, uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MaxValueValidator
from django.utils import timezone
from django.utils.text import slugify


from pathlib import Path

def upload_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    destination = Path("profile_pictures") / instance.username / filename
    return str(destination)

def upload_image_id_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    destination = Path("photo_ids") / instance.username / filename
    return str(destination)

def upload_image_edu_bg_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    destination = Path("education_background") / instance.username / filename
    return str(destination)


def update_last_login(sender, user, **kwargs):
    """
    A signal receiver which updates the last_login date for
    the user logging in.
    """
    user.last_login = timezone.now()
    user.save(update_fields=["last_login"])


class UserManager(BaseUserManager):

    # Normalize the email address by lowercasing the domain part of it.
    @classmethod
    def normalize_email(cls, email):
        email = email or ""
        try:
            email_name, domain_part = email.strip().rsplit("@", 1)
        except ValueError:
            pass
        else:
            email = email_name + "@" + domain_part.lower()
        return email


    def create_user(
        self, 
        email,
        username,
        password=None, 
        is_active=True, 
        is_staff=False, 
        is_student=False, 
        is_tutor=False, 
    ):
        if not email:
            raise ValueError("User must have email")
        if not password:
            raise ValueError("User must have password")

        email = self.normalize_email(email)

        user = self.create(
            email=email,
            password=password,
            username=username,
            active=is_active,
            staff=is_staff,
            student=is_student,
            tutor=is_tutor,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self, 
        email=None, 
        password=None, 
        username=None,
        is_staff=True, 
    ):
        if is_staff is not True:
            raise ValueError("Superuser must have is_staff=True.")

        user = self.create_user(
            email,
            password=password,
            username=username,
            is_staff=True,
        )

        return user


class Subject(models.Model):
    subject_title = models.TextField(max_length=100)

    def __str__(self):
        # return f"{self.subject_title} ({self.user.username})"
        return self.subject_title


class User(AbstractBaseUser):
    # Default/Global User Fields:
    email = models.EmailField(("Email Address"), unique=True, blank=True)
    username = models.CharField(("Username"), max_length=150, unique=True, help_text=("Required. 150 characters or fewer"), error_messages={"unique": ("A user with that username already exists."),},)
    first_name = models.CharField(("First Name"), max_length=150, blank=True)
    last_name = models.CharField(("Last Name"), max_length=150, blank=True)
    password = models.CharField(("Password (Hashed)"), max_length=128)
    contact = models.CharField(("Contact Number"), max_length=50, blank=True)
    profile_picture = models.ImageField(("User Picture"), default='profile_pictures/default/tutor.jpg', upload_to=upload_image_path, null=True)
    # Login-related:
    date_joined = models.DateTimeField(("Date joined"), default=timezone.now)
    last_login = models.DateTimeField(("Last Login"), blank=True, null=True)
    # Tutor Fields:
    meeting_link = models.TextField(("Zoom Link"), blank=True, null=True)
    bio = models.TextField(("Bio (Contains Introduction, and Lessons)"), max_length=999999, blank=True)
    subjects = models.ManyToManyField(Subject, related_name='users', blank=True)
    photo_education_background = models.ImageField(("Education Background"), upload_to=upload_image_edu_bg_path, null=True, blank=True)
    photo_id = models.ImageField(("Photo ID"), upload_to=upload_image_id_path, null=True, blank=True)
    price_rate_hour = models.DecimalField(("Hourly Price Rate"), max_digits=3, decimal_places=0, default=0, null=True)
    numReviews = models.IntegerField(("Reviews"), null=True, default=0)
    # User Options:
    active = models.BooleanField(("Active"), default=True, help_text=("Designates whether this user should be treated as active. Unselect this instead of deleting accounts."),)
    staff = models.BooleanField(("Staff/Administrative Privilages"), default=False, help_text=("Designates whether the user can log into this admin site."),)
    tutor = models.BooleanField(("Tutor"), default=False, help_text=("Categorizes the user as tutor"),)
    student = models.BooleanField(("Student"), default=False, help_text=("Categorizes the user as student"),)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        username = self.username if self.username else "No username"
        return f"{self.email} ({username})"
    
    @property
    def is_tutor(self):
        return self.tutor

    @property
    def is_student(self):
        return self.student

    ###########################################################
    #### important bits for logging into Django Admin page ####
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_active(self):
        return self.active
    ###########################################################
    ###########################################################


class Review(models.Model):
    user_tutor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='reviews_received')
    user_student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='reviews_made')
    rating =  models.IntegerField(null=True, blank=True, default=1)
    comment = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating}/5 by {self.user_student.username} to {self.user_tutor.username}"
    

class Contact(models.Model):
    name = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='contact_name')
    concern = models.TextField(max_length=300, null=True, blank=True)
    comment = models.TextField(max_length=5000, null=True, blank=True)
    created_date = models.DateTimeField(("Date created"), default=timezone.now)
    done = models.BooleanField(default=False)

    def __str__(self):
        return f"concern of {self.name.username}"
    

class Schedule(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count_in_stock = models.PositiveIntegerField(default=1, validators=[MaxValueValidator(24)])
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def reduce_stock(self, quantity):
        self.count_in_stock -= quantity
        self.save()

    def save(self, *args, **kwargs):
        if self.owner.price_rate_hour:
            self.price = self.owner.price_rate_hour
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"


class ScheduleOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    schedules = models.ManyToManyField(Schedule, through='ScheduleOrderItem')
    message = models.TextField(("Message to Tutor"), max_length=250, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    paid_status = models.BooleanField(default=False)
    paid_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    session_status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Date: {self.date_created.strftime('%Y-%m-%d')} - Time: {self.date_created.strftime('%H:%M:%S')} - {self.user.username}"


class ScheduleOrderItem(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    schedule_order = models.ForeignKey(ScheduleOrder, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.schedule.name}"
    
