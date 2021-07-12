
interface Props {
    children: JSX.Element
};

function Centered(props: Props) {
    return (
        <div className="row h-100 justify-content-center align-items-center text-center">
            { props.children }
        </div>
    )
}

export default Centered
