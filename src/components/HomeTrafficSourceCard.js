import React from 'react'

export default function HomeTrafficSourceCard(props) {
    const { Tdata } = props.dataToSend;

    Tdata.map((data, index) => () => {
        console.log(data)
    })

    return (
        <div class="MuiGrid-root MuiGrid-item">
            <div class="MuiPaper-root MuiCard-root sc-fzokvW jbgEdl MuiPaper-elevation1 MuiPaper-rounded" mb="3">
                <div class="MuiCardHeader-root">
                    <div class="MuiCardHeader-content">
                        <span class="MuiTypography-root MuiCardHeader-title MuiTypography-h6 MuiTypography-displayBlock">Traffic sources</span>
                    </div>
                </div>
                <div class="MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded">
                    <div class="sc-fzqLLg doivoh">
                        <table class="MuiTable-root">
                            <thead class="MuiTableHead-root">
                                <tr class="MuiTableRow-root MuiTableRow-head">
                                    <th class="MuiTableCell-root MuiTableCell-head" scope="col">Source</th>
                                    <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight" scope="col">Users</th>
                                    <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight" scope="col">Sessions</th>
                                    <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight" scope="col">Bounce Rate</th>
                                    <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight" scope="col">Avg. Session Duration</th>
                                </tr>
                            </thead>
                            <tbody class="MuiTableBody-root">
                                {/* {Tdata.map((data, index) => { */}
                                {/* return ( */}
                                <tr class="MuiTableRow-root">
                                    <th class="MuiTableCell-root MuiTableCell-body" role="cell" scope="row">""</th>
                                    <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">data.v2</td>
                                    <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">data.v3</td>
                                    <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">
                                        <div class="MuiChip-root sc-fzqzlV dKyNUC" rgbcolor="#4caf50">
                                            <span class="MuiChip-label">data.v4 %</span>
                                        </div>
                                    </td>
                                    <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">data.v5</td>
                                </tr>
                                {/* ); */}
                                {/* })} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
