const Error = ({message}) => {
    if (message === null) {
        return null;
    }

    return (
        <div className="errorMessage">
            {message}
        </div>
    )
}

export default Error
