// import React, { Component } from 'react'
// import { Card, Modal, Button, Icon, Header, List, Segment, Divider } from 'semantic-ui-react'

// class ToolsComponent extends Component {


//     render() {
//         return (
//             this.props.tools
//         )
//     }
// }

// export default ToolsComponent








// import React from 'react'
// import { Button, Header, Image, Modal, Checkbox, Form, Input, Radio, Select, TextArea, Segment } from 'semantic-ui-react'

// const options = [
//     { key: 'm', text: 'Must-have', value: 'Must-have' },
//     { key: 'n', text: 'Nice-to-have', value: 'Nice-to-have' },
// ]

// class FormExampleFieldControl extends Component {

//     state = {}

//     handleChange = (e, { value }) => this.setState({ value })

    
//     render() {
//         const { value } = this.state
//         return (
//             <Modal trigger={<Button>Show Modal</Button>}>
//                 <Modal.Header>Select a Photo</Modal.Header>
//                 <Modal.Content >
//                     <Segment inverted>
//                     <Form inverted>
//                         <Form.Group widths='equal'>
//                         <Form.Field control={Input} label='Item Name' placeholder='Item Name' />
//                         <Form.Field control={Select} label='Importance' options={options} placeholder='Choose one' />
//                         </Form.Group>
//                         <Form.Field control={Button}>Add the Item</Form.Field>
//                     </Form>
//                     </Segment >
//                 </Modal.Content>
//             </Modal>
//         )
//     }
// }

// export default ormExampleFieldControl  