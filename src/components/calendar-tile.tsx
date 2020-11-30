import React from 'react';
import './calendar-tile.scss';
import axios from 'axios';
import uniqid from 'uniqid';

const SENTENCES = [
    "Congrats my friend, well done! You're a machine!",
    "Keep it up! Amazing!",
    "I like your style. Go on.",
];

const IS_DEV = false;

type CalendarTileProps = {
    item: {
        title: string;
        id: string;
        validFrom: string;
        description: string;
        social_description: string;
        link: string;
    }
}

type CalendarTileState = {
    isFlipped: boolean;
    done: boolean;
}

class CalendarTile extends React.Component<CalendarTileProps, CalendarTileState> {

    constructor(props: CalendarTileProps) {
        super(props);
        var tmp = new Date(this.props.item.validFrom);
        this.state = {
            isFlipped: tmp.setDate(tmp.getDate() + 1) < Date.now(),
            done: false,
        }
    }

    onFlip() {
        const { item } = this.props;
        if ((Date.parse(item.validFrom) < Date.now()) || IS_DEV) {
            this.setState({
                isFlipped: !this.state.isFlipped
            });   
        } else {
            alert("Door is not yet open my friend! Stay patient!");
        }
    }

    onDidIt(e: any) {
        e.stopPropagation();
        var sessionId = uniqid();
        const userInfo = localStorage.getItem("contextInfo");
        if (userInfo) {
            const parsed = JSON.parse(userInfo);
            sessionId = parsed.sessionId;
        }
        axios.post("https://advent-calendar-7daed.firebaseio.com/challenges.json", {
            challengeId: this.props.item.id,
            sessionId: sessionId,
            timestamp: new Date().toUTCString()
        }).then(() => {
            const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
            alert(sentence);
            this.setState({
                done: true
            });
            localStorage.setItem('contextInfo', JSON.stringify({sessionId: sessionId}));
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
                        <div>
                            <div className="explaination" dangerouslySetInnerHTML={{__html: item.description}}></div>
                            <div className="link-container">
                                {item.link && <a href={item.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="link">Show exercise</a>}
                            </div>
                        </div>
                        {item.social_description && <div className="social">
                            <div>INSPIRATION</div>
                            <div>{item.social_description}</div>
                        </div>}
                        {<button disabled={this.state.done} className="btn-default" onClick={(e) => this.onDidIt(e)}>I did it!</button>}
                    </div>}
                </div>
            </div>
        );
    }
}

export default CalendarTile;