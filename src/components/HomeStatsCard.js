import React from 'react'


export default function HomeStatsCard(props) {
    return (
        <div className="MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded">
            <div className="MuiCardContent-root sc-fznyYp izOFrO">
                <h6 className="MuiTypography-root sc-fzpisO HaxYk MuiTypography-h6" mb="6">{props.title}</h6>
                <br />
                <h3 className="MuiTypography-root sc-fzpisO HaxYk MuiTypography-h3" mb="6">
                    <div className="MuiBox-root jss1242">{props.value}</div>
                </h3>
                <br />
                <h6 className="MuiTypography-root sc-fznXWL dIyfcg MuiTypography-subtitle1" mb="6" percentagecolor={props.color}>
                    <span>{props.percentage}</span> Since last week</h6>
                <div className="MuiChip-root sc-fznLxA jsgmEM">
                    <span className="MuiChip-label">{props.date}</span>
                </div>
            </div>
        </div>
    )
}
