const Success = ({message}) => {
    if (message === null) {
        return null;
    }

    return (
        <div className="successMessage">
            {message}
        </div>
    )
}

export default Success
