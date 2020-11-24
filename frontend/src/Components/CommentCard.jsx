import React from 'react';
import {Card} from 'react-bootstrap'
const styles = {
    commentLayout : {
    width: '35%',
    marginTop: '2%'
    }
}

const CommentCard = (props) => {

    const {by,comment} = props.comment;

    return ( 
        <Card className = 'mx-auto' bg = 'dark' style = {styles.commentLayout}>
            <Card.Body>
            <Card.Subtitle className="mb-2" style = {{color: '#bdbbbb'}}>{by}</Card.Subtitle>
            <Card.Text>{comment}</Card.Text>
            </Card.Body>
            
        </Card>
     );
}
 
export default CommentCard;