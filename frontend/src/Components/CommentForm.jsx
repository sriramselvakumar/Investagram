import React from 'react';
import {Card,Button,Form} from 'react-bootstrap'

const styles = {
    commentForm: {
        width: '35%',
        marginTop: '2%'
      },
      alignCenter: {
        textAlign: 'center'
      }
}

const CommentForm = (props) => {
    const {commentForm, alignCenter} = styles 
    const {setDescription,submitForm} = props 
    return (  
        <Card bg = 'dark' style = {commentForm} className = 'mx-auto'>
              <Card.Body>
                <Card.Title style = {alignCenter}>Post Comment</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Control 
                    as = 'textarea' 
                    placeholder = 'Enter your description' 
                    rows ={3} 
                    onChange = {(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <div style = {alignCenter}>
                  <Button className = 'mx-auto' variant = 'success' onClick = {submitForm}>Submit</Button>
                  </div>
                 
                </Form>
              </Card.Body>
            </Card>
    );
}
 
export default CommentForm;