import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import { getMyInfo } from "./VoteContract.js"

const MY_INFO = () => {
	const [id, setId] = useState(0)
	const [address, setAddress] = useState("")

	useEffect(() => {
		const get_MyInfo = async () => {
			const accounts = await window.ethereum.request({ method: "eth_accounts" })
			const activeAccount = accounts[0]
			const myInfo = await getMyInfo()
			setId(myInfo.userid)
			setAddress(myInfo.addr)
			console.log(myInfo)
		}
		window.ethereum.on("accountsChanged", get_MyInfo)
		get_MyInfo()
		return () => window.ethereum.off("accountsChanged", get_MyInfo)
	}, [])

	return (
		<div className="App">
			<h1>My Info</h1>
			<p>My ID: {id}</p>
			<p>My Address: {address}</p>
			<Link to="/">Home</Link>
		</div>
	)
}

export default MY_INFO
