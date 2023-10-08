import React from 'react'
import { motion } from 'framer-motion';
type Props = {
    children: React.ReactNode
    toogle: boolean
}

const AnimatedDiv: React.FC<Props> = ({ children, toogle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: !toogle ? -100 : 0 }}
            animate={{ opacity: toogle ? 1 : 0, y: toogle ? 0 : -100 }}
            exit={{ opacity: 0, y: -100 }}
        >
            {toogle ? children : null}
        </motion.div>
    )
}

export default AnimatedDiv