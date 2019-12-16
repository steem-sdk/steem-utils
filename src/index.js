
import lib from "./lib"

import { Client } from "dsteem"
import "./styles/index.scss"

const client = new Client("https://api.steemit.com")

const author = "likwid"
const permlink = "announcing-likwid-the-reward-liquifier"

async function go () {
  const input = document.getElementById("inputField").value
  const type = document.getElementById("selectField").value
  // console.log("go...", input, type)

  //
  // const res = await client.database.call("get_content", [author, permlink])
  // console.log(res, lib.meta(res))

  const posts = await client.database.getDiscussions("blog", { tag: "dzivenu", limit: 10 })
  // console.log(posts)
  console.log(await lib.parse(posts, { meta: { all: true } }))

  // const [account] = await client.database.getAccounts([author])
  // console.log(account)

  // console.log(account, lib.meta(account))
}

window.go = go

/*

// Test import of a JavaScript function, an SVG, and Sass
import HelloWorld from "./js/HelloWorld"
import WebpackLogo from "./images/webpack-logo.svg"

// Create SVG logo node
const logo = document.createElement("img")
logo.src = WebpackLogo

// Create heading node
const greeting = document.createElement("h1")
greeting.textContent = HelloWorld()

// Append SVG and heading nodes to the DOM
const app = document.querySelector("#root")
app.append(logo, greeting)

*/
