import { FunctionComponent } from 'react'
import { ExampleProject } from 'types/datocms'
import Image from 'next/image'

type Props = {
  project: ExampleProject
}

const ExampleProjectComponent: FunctionComponent<Props> = ({ project }) => (
  <div className="bg-bg2 rounded-xl my-3 max-w-[600px] md:flex md:max-w-4xl shadow-lg">
    <div className="w-full md:max-w-[250px] flex justify-center">
      <Image
        src={project.picture.url}
        width={project.picture.width}
        height={project.picture.height}
        className="rounded-t-xl md:rounded-t-none md:rounded-l-xl md:rounded-tl-xl object-cover"
      />
    </div>
    <div className="md:p-4 flex flex-col-reverse md:flex-col">
      <h4 className="text-center md:text-left text-3xl md:text-xl md:mb-4 bg-accent2 text-bg md:bg-bg2 md:text-accent p-2 md:p-0 rounded-b-xl">
        {project.name}
      </h4>
      <div
        dangerouslySetInnerHTML={{ __html: project.description }}
        className="text-justify p-4 md:p-0"
      ></div>
    </div>
  </div>
)

export default ExampleProjectComponent
