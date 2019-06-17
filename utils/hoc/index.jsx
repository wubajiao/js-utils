const hoc = (WrappedComponent) =>
    class WrapperComponent extends React.Component {
        render() {
            return (
                <div>
                    <Components />
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }


export default hoc
