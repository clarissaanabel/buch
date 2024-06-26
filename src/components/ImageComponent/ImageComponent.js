import Image from 'next/image'
import PropTypes from 'prop-types'

const ImageComponent = ({ className, src, alt, width, height }) => {
    return <Image className={className} src={src} alt={alt} width={width} height={height} />
}

ImageComponent.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default ImageComponent;