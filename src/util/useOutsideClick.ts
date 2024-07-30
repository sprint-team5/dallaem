import { RefObject, useEffect } from "react"

/**
 * @example
 * ```
 * import { useRef, useState } from "react"
 * 
 * const Function = () => {
 *  const [isOpen, setIsOpen] = useState(false)
 *  const dropdownRef = useRef<HTMLDivElement>(null)
    useOutsideClick(dropdownRef, () => {
      return setIsOpen(false)
    })
    return <div ref={dropdownRef}/>
  }
 * ```
 */

export default function useOutsideClick(ref: RefObject<HTMLDivElement>, onClick: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, onClick])
}
