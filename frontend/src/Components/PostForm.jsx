import React from 'react';
import {Card,Form,Button} from 'react-bootstrap'


const PostForm = (props) => {
    const {setTitle,setDescription,setImageLink,onSubmit} = props
    return (
            <Card
              className="mx-auto"
              bg = 'dark'
              style={{ width: "40%", marginTop: '2%' }}
            >
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Title of your post"
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Write more about your post"
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      placeholder = "Image Link (Optional)"
                      onChange={(event) => setImageLink(event.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Button
                  onClick={onSubmit}
                  className="mx-auto"
                  variant="outline-success"
                >
                  Post
                </Button>
              </Card.Body>
            </Card>
     );
}
 
export default PostForm;