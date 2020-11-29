import React from 'react';
import './calendar-tile.scss';

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
            alert("Not yet my friend! Stay patient!");
        }
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
                    </div>}
                </div>
            </div>
        );
    }
}

export default CalendarTile;