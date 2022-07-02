import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/46e43q.png",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({ allMemeImgs: memes})
        })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        console.log(randNum)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg})
    }

    render(){
        return(
            <div>
                <form className="form col sm={12}" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder = "Top text"
                        name = "topText"
                        value = {this.state.topText}
                        onChange = {this.handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        name = "bottomText"
                        value = {this.state.bottomText}
                        onChange = {this.handleChange}
                    />
                    <button className="button-54 col sm={6}">Change Meme</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="topText">{this.state.topText}</h2>
                    <h2 className="bottomText">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator