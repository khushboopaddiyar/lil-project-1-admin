import React from 'react'

import Testimonial from './Testimonial'

const TestimonialList = props => {
    return (
        <>
            {
                props.testimonials.map(testimonial =>
                    <Testimonial
                        key={testimonial._id}
                        testimonial={testimonial}
                        deleted={props.deleted}
                        remove={props.remove.bind(this, testimonial._id)}
                    />
                )
            }
        </>
    )
}

export default TestimonialList