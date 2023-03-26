import os, uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone


def upload_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" %(uuid.uuid4(), ext)
    destination = os.path.join('profile_pictures/', "%s/%s" %(instance.username, filename))
    return destination


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

        user = self.model(email=email)
        user.set_password(password)
        user.active = is_active
        user.staff = is_staff
        user.student = is_student
        user.tutor = is_tutor
        user.save(using=self._db)

        return user

    def create_superuser(
        self, 
        email=None, 
        password=None, 
        is_staff=True, 
    ):
        if is_staff is not True:
            raise ValueError("Superuser must have is_staff=True.")

        user = self.create_user(
            email,
            password=password,
            is_staff=True,
        )

        return user

# have other plan for this:
class Subject(models.Model):
    subject_title = models.TextField(max_length=100)
    _id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.subject_title


class User(AbstractBaseUser):

    username = models.CharField(("username"), max_length=150, unique=True, help_text=("Required. 150 characters or fewer"), error_messages={"unique": ("A user with that username already exists."),},)
    email = models.EmailField(("email address"), unique=True, blank=True)
    password = models.CharField(("password"), max_length=128)
    first_name = models.CharField(("first name"), max_length=150, blank=True)
    last_name = models.CharField(("last name"), max_length=150, blank=True)
    profile_picture = models.ImageField(("User Picture"), null=True, default='profile_pictures/default/tutor.jpg', upload_to=upload_image_path)
    contact = models.CharField(("contact number"), max_length=50, blank=True)
    
    # have other plan for these:
    bio = models.TextField(("bio"), max_length=50, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, blank=True)
    # to be deprecated
    numReviews = models.IntegerField(("reviews"), null=True, blank=True)

    active = models.BooleanField(("active"), default=True, help_text=("Designates whether this user should be treated as active. Unselect this instead of deleting accounts."),)
    staff = models.BooleanField(("staff status"), default=False, help_text=("Designates whether the user can log into this admin site."),)
    student = models.BooleanField(("Student"), default=False, help_text=("Categorizes the user as student"),)
    tutor = models.BooleanField(("Tutor"), default=False, help_text=("Categorizes the user as tutor"),)
    date_joined = models.DateTimeField(("date joined"), default=timezone.now)
    last_login = models.DateTimeField(("last login"), blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email + " (" + self.username + ")"

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
    
    @property
    def is_tutor(self):
        return self.tutor

    @property
    def is_student(self):
        return self.student

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    schedule = models.TextField(max_length=300, null=True)
    lesson_name = models.CharField(max_length=300, null=True, blank=True)
    rate_hour = models.DecimalField(max_digits=5, decimal_places=0, null=True, blank=True)
    _id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.lesson_name