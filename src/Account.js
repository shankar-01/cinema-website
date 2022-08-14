import { useState } from "react"

export default function Account(){
    const [account, setAccount] = useState(()=>{
        return JSON.parse(localStorage
            .getItem("cinema-account"))
    })
    return (
        <div className="container" style={{color:"white"}}>
            <div className="row">
                <div className="col">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <h2>Name:</h2>
                                </td>
                                <td>
                                    <h2>{
                                        account.name
                                    }</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>Email:</h2>
                                </td>
                                <td>
                                    <h2>{
                                        account._id
                                    }</h2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}