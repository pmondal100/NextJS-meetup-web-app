import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { listInterface } from '@/utils/commonInterfaces';

function MeetupList(props: listInterface) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          content={meetup.content}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
