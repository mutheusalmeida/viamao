import { EyeIcon, EyeOff } from 'lucide-react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { Button } from './button'

type RenderProps = {
  showPassword: boolean
}

type PasswordFieldProps = {
  render: (props: RenderProps) => ReactNode
}

type PasswordControlProps = {
  children: ReactNode
}

const PasswordControl = ({ children }: PasswordControlProps) => {
  return <div className="relative">{children}</div>
}

const PasswordToggler = () => {
  const { showPassword, toggler } = usePasswordContext()

  return (
    <Button
      className="absolute right-0 top-0 text-muted-foreground"
      type="button"
      variant="link"
      onClick={toggler}
    >
      {showPassword ? (
        <EyeIcon className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
    </Button>
  )
}

type PasswordContextProps = {
  showPassword: boolean
  toggler: () => void
}

const PasswordContext = createContext({} as PasswordContextProps)

const PasswordField = ({ render }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggler = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <PasswordContext.Provider value={{ showPassword, toggler }}>
      {render({ showPassword })}
    </PasswordContext.Provider>
  )
}

const usePasswordContext = () => useContext(PasswordContext)

export { PasswordControl, PasswordField, PasswordToggler }
