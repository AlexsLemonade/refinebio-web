// Sample test
import { render, screen } from '@testing-library/react'
import Home from 'pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
  })
})
