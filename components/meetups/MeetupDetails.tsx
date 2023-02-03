import { listItemInterface } from "@/utils/commonInterfaces";
import classes from './MeetupDetails.module.css';

const MeetupDetails = (props: listItemInterface) => {
    return(
        <section className={classes.detail}>
            <img src={props.image} alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.content}</p>
        </section>
    )
}

export default MeetupDetails;