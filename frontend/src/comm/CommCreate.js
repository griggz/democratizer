import React, {Component} from 'react'
import CommForm from './CommForm'

class CommCreate extends Component {

    render() {
        const {post} = this.props.location.state;
        return (
            <div class="col-md-10" align-items="center">
                {post !== null ?
                    <CommForm post={post}/>
                    : <CommForm />
                }
            </div>
        )
    }

}

export default CommCreate

// left for reference


// import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
// import moment from 'moment'

// class PostCreate extends Component {
//     constructor(props){
//         super(props)
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleInputChange = this.handleInputChange.bind(this)
//         this.handleDraftChange = this.handleDraftChange.bind(this)
//         this.clearForm = this.clearForm.bind(this)
//         this.postTitleRef = React.createRef()
//         this.postContentRef = React.createRef()
//         this.state = {
//             draft: false,
//             title: null,
//             content: null,
//             publish: null,
//             errors: {}
//         }
//     }
//     createPost(data){
//       const endpoint = '/api/posts/' 
//       const csrfToken = cookie.load('csrftoken')
//       let thisComp = this
//       if (csrfToken !== undefined) {
//           let lookupOptions = {
//               method: "POST",
//               headers: {
//                   'Content-Type': 'application/json',
//                   'X-CSRFToken': csrfToken
//               },
//               body: JSON.stringify(data),
//               credentials: 'include'
//           }

//           fetch(endpoint, lookupOptions)
//           .then(function(response){
//               return response.json()
//           }).then(function(responseData){
//               console.log(responseData)
//               if (thisComp.props.newPostItemCreated){
//                   thisComp.props.newPostItemCreated(responseData)
//               }
//               thisComp.clearForm()
//           }).catch(function(error){
//               console.log("error", error)
//               alert("An error occured, please try again later.")
//           })
//       } 

//   }

//     handleSubmit(event){
//         event.preventDefault()
//         let data = this.state
//         this.createPost(data)
//     }

//     handleInputChange(event){
//         event.preventDefault()
//         let key = event.target.name
//         let value = event.target.value
//         if (key === 'title'){
//             if (value.length > 120){
//                 alert("This title is too long")
//             }
//         }
//         this.setState({
//             [key]: value
//         })
//     }

//     handleDraftChange(event){
//       this.setState({
//         draft: !this.state.draft
//       })
//     }

//     clearForm(event){
//       if (event){
//         event.preventDefault()
//       }
//       this.postCreateForm.reset()
//     }


//     clearFormRefs(){
//       this.postTitleRef.current=''
//       this.postContentRef.current=''
//     }


//     componentDidMount(){
//         this.setState({
//             draft: false,
//             title: null,
//             content: null,
//             publish: moment(new Date()).format('YYYY-MM-DD'),
//         })
//         this.postTitleRef.current.focus()
//     }

//     render(){
//         const {publish} = this.state
//         let thisComp = this
//         return (
//             <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}>
//                 <div className='form-group'>
//                     <label for='title'>Post title</label>
//                     <input 
//                       type='text' 
//                       id='title' 
//                       name='title' 
//                       className='form-control'
//                       placeholder='Blog post title' 
//                       ref = {this.postTitleRef}
//                       onChange={this.handleInputChange} 
//                       required='required'/>
//                 </div>
//                  <div className='form-group'>
//                     <label for='content'>Content</label>
//                     <textarea id='content' ref = {this.postContentRef} name='content' className='form-control' placeholder='Post content' onChange={this.handleInputChange} required='required'/>

//                 </div>
//                 <div className='form-group'>
//                     <label for='draft'>
//                     <input type='checkbox' checked={this.state.draft} id='draft' name='draft' className='mr-2' onChange={this.handleDraftChange}/>
//                      Draft </label>
//                      <button onClick={(event)=>{event.preventDefault();this.handleDraftChange()}}>Toggle Draft</button>
//                 </div>
//                 <div className='form-group'>
//                     <label for='publish'>Publish Date</label>
//                     <input 
//                     type='date' 
//                     id='publish' 
//                     name='publish' 
//                     className='form-control' 
//                     onChange={this.handleInputChange}
//                      value={publish}
//                      required='required'/>
//                 </div>
//                 <button type='submit' className='btn btn-primary'>Save</button>
//                 <button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
//             </form>
//         )
//     }

// }

// export default PostCreate