import React from 'react'

import Course from './Course'
import '../assets/css/bootstrap-grid.min.css'

const CourseList = props => {
    return (
        <div className="row" style={{ margin: 12 }}>
            {
                props.courses.map(course =>
                    <Course
                        key={course._id}
                        course={course}
                        deleted={props.deleted}
                        remove={props.remove.bind(this, course._id)}
                    />
                )
            }
        </div>
    )
}

export default CourseList