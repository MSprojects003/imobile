declare module 'react-image-magnify' {
  interface ReactImageMagnifyProps {
    smallImage: {
      alt: string
      isFluidWidth?: boolean
      src: string
      width?: number
      height?: number
    }
    largeImage: {
      src: string
      width: number
      height: number
    }
    lensStyle?: React.CSSProperties
    enlargedImageStyle?: React.CSSProperties
    enlargedImageContainerStyle?: React.CSSProperties
  }
  const ReactImageMagnify: React.FC<ReactImageMagnifyProps>
  export default ReactImageMagnify
}