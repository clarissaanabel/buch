import ImageComponent from '@/components/ImageComponent/ImageComponent'

export default function HomeBannerLogo() {
  return (
    <>
      <ImageComponent
        className='rounded-2xl shadow-xl'
        src="/BrandLogo.jpg"
        alt="Brand Logo"
        width={380}
        height={100}
      />
    </>
  )
}
