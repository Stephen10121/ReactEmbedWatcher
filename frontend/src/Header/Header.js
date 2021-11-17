import "./Header.css";

function Header(props) {
    return (
      <div className="Header">
          Header Part
          {props.children}
      </div>
    );
  }
  
  export default Header;