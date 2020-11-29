import React from 'react';
import './calendar-tile.scss';
import axios from 'axios';
import uniqid from 'uniqid';

const SENTENCES = [
    "Congrats my friend, well done! You're a machine!",
    "Keep it up! Amazing!",
    "I like your style. Go on.",
];

const IS_DEV = process.env.IS_DEV || false;

type CalendarTileProps = {
    item: {
        title: string;
        id: string;
        validFrom: string;
        description: string;
        link: string;
    }
}

type CalendarTileState = {
    isFlipped: boolean;
}

class CalendarTile extends React.Component<CalendarTileProps, CalendarTileState> {

    constructor(props: CalendarTileProps) {
        super(props);
        this.state = {
            isFlipped: false
        }
    }

    onFlip() {
        const { item } = this.props;
        if ((item.validFrom && Date.parse(item.validFrom) < Date.now()) || IS_DEV) {
            this.setState({
                isFlipped: !this.state.isFlipped
            });   
        } else {
            alert("Door is not yet open my friend! Stay patient!");
        }
    }

    onDidIt(e: any) {
        e.stopPropagation();
        axios.post("https://advent-calendar-7daed.firebaseio.com/challenges.json", {
            challengeId: this.props.item.id,
            sessionId: uniqid()
        }).then(() => {
            const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
            alert(sentence);
            this.setState({
                isFlipped: !this.state.isFlipped
            });
        }).catch(e => {
            console.error("something went wrong: ", e);
        });
    }

    render() {
        const additionalClassName = this.state.isFlipped ? "is-flipped" : "";
        const { item } = this.props;
        return (
            <div className="calendar-tile">
                <div className={`calendar-card ${additionalClassName}`} onClick={() => this.onFlip()}>
                    <div className="card__face card__face--front">{item.id}</div>
                    {((item.validFrom && Date.parse(item.validFrom) < Date.now()) || IS_DEV) && <div className="card__face card__face--back">
                        <div className="explaination" dangerouslySetInnerHTML={{__html: item.description}}>
                        </div>
                        <div className="link-container">
                            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="link">Show exercise</a>}
                        </div>
                        <button className="btn-default" onClick={(e) => this.onDidIt(e)}>I did it!</button>
                    </div>}
                </div>
            </div>
        );
    }
}

export default CalendarTile;