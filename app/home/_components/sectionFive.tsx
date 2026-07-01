import Image from "next/image"

const SectionFive = () => {
  return (
    <div className="flex justify-center mt-10">
      <Image
        src="/images/section5/diagram.png"
        alt="Workflow Diagram"
        width={1450}
        height={830}
        className="w-full max-w-4xl h-auto"
      />
    </div>
  )
}

export default SectionFive
