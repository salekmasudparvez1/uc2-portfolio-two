import logo from "/logo.png";

const Logo = ({ className =""}:{className?:string}) => {
    return (
        <>
           <img src={logo} className={className} alt="Logo" /> 
        </>
    );
}

export default Logo;
