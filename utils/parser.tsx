import parse, { DOMNode, Element, attributesToProps, domToReact } from 'html-react-parser'
import { Highlight, MarginaliaRight, MarginaliaLeft, Divider, TypewriterBlock, DoodleEnd } from '@/app/components/ContentBlocks'

export function parseContent(html: string) {
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.attribs) {
        
        // Match Highlight
        if (domNode.name === 'span' && domNode.attribs['data-color']) {
          const color = domNode.attribs['data-color']
          return (
            <Highlight color={color}>
              {domNode.children ? domToReact(domNode.children, options) : null}
            </Highlight>
          )
        }

        // Match Marginalia
        if (domNode.name === 'div' && domNode.attribs['data-type'] === 'marginalia') {
          const side = domNode.attribs['side']
          if (side === 'left') {
            return (
              <MarginaliaLeft>
                {domNode.children ? domToReact(domNode.children, options) : null}
              </MarginaliaLeft>
            )
          }
          return (
            <MarginaliaRight>
              {domNode.children ? domToReact(domNode.children, options) : null}
            </MarginaliaRight>
          )
        }

        // Match TypewriterBlock
        if (domNode.name === 'div' && domNode.attribs['data-type'] === 'typewriter') {
          return (
            <TypewriterBlock>
              {domNode.children ? domToReact(domNode.children, options) : null}
            </TypewriterBlock>
          )
        }

        // Match Divider
        if (domNode.name === 'hr' && domNode.attribs['data-type'] === 'divider') {
          return <Divider />
        }

        // Match DoodleEnd
        if (domNode.name === 'div' && domNode.attribs['data-type'] === 'doodle-end') {
          return <DoodleEnd />
        }

        // Default: Add "relative" class to paragraphs to match original design
        if (domNode.name === 'p') {
          const props = attributesToProps(domNode.attribs)
          return (
            <p {...props} className={`relative ${props.className || ''}`}>
              {domNode.children ? domToReact(domNode.children, options) : null}
            </p>
          )
        }
      }
    }
  }

  return <>{parse(html, options)}</>
}

