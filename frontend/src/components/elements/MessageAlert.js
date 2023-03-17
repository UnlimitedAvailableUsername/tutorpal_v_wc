import {Alert} from 'react-bootstrap'

function MessageAlert({ variant, children }) {
    return(
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default MessageAlert