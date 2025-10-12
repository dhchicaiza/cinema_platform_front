import { create } from 'zustand'

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

type Store = {
    user: User | null
    setUser: (user: User) => void
}

const useUserStore = create<Store>()(
    (set) => ({
        user:null ,//{
         //   id: '1',
           // name: 'Laura',
            //email: 'laura@example.com',
            //age: 25
        //}, // Usuario de prueba para mostrar la funcionalidad
        setUser: (user: User) =>{
            console.log('Store está siendo actualizado con:', user);
            set(
            {
                user: user
            })}
    })
)

export default useUserStore;