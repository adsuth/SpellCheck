// import { useAtom } from 'jotai'
// import { createContext, useContext } from 'react'
// import { gameStateAtom } from '../atoms'

// const HandleNewRoundContext = createContext<Function>( ( _newPage: ViewEnum ) => {}  )

// export function useNewRoundContext()
// {
//   useContext(  )
// }

// interface Props {
//   children: any
// }

// export default function NewRoundContext( {children}: Props ) {
//   const [ , setGameState ] = useAtom( gameStateAtom )
  
//   return (
//     <HandleNewRoundContext.Provider value={ setGameState }>
//       {children}
//     </HandleNewRoundContext.Provider>
//   )
// }