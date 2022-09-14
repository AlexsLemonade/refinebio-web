const Home = () => (
  <div style={{ margin: ' 100px, auto' }}>
    <h1>Refinebio-web</h1>
    <button
      type="button"
      onClick={() => {
        throw new Error('Error')
      }}
    >
      Generate Error
    </button>
  </div>
)

export default Home
