import { useQuery } from '@tanstack/react-query'
import { CreateGoal } from './components/create-goal'
import { EmptyGoal } from './components/empty-goal'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { useState, useEffect } from 'react'
import { getSummary } from './http/get-summary'



export function App() {
  // const [summary, setSummary] = useState<summaryResponse | null>(null)
  const {data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 5 minutos
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoal />}
      
      <CreateGoal />
    </Dialog>
  )
}