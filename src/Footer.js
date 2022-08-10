import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <div className="container"
        style={{backgroundColor:"#262626"
            ,color:"white"
        }}
        >
            <table width="100%">
                <tbody>
                    <tr>
                        <td>
                        <p>
                            <i class="fa fa-phone"></i>
                            +923000123000</p>
                        <p>
                        <i class="fa fa-envelope"></i>
                            cinema@support.com</p>
                        </td>
                        <td>
                            <p>Here you can book a ticket
                            for cinema.
                            </p>
                        </td>
                        <td>
                            <Link to='/'>
                            <i class="fa fa-home"></i>    
                            Home </Link>
                            <br/>
                            <Link to='/about'>
                            <i class="fa fa-info-circle"></i>
                            About </Link>
                            <br/>
                            <Link to='/contactus'>
                            <i class=
                            "fa fa-send"></i>
                            Contact Us</Link>
                        </td>
                    </tr>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    )
}