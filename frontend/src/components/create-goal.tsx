import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { X } from 'lucide-react'
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from './ui/radio-group'
import { 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogTitle
} from './ui/dialog'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { createGoal } from "../http/create-goal"
import { useQueryClient } from "@tanstack/react-query"


const createGoalFormSchema = z.object({
  title: z.string().min(1, 'Informe a actividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalForm = z.infer<typeof createGoalFormSchema>

export  function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState } = useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalFormSchema)
  })

  async function handleCreateGoal(data: CreateGoalForm)
  {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency
    })

    queryClient.invalidateQueries({queryKey: ['summary']})
    queryClient.invalidateQueries({queryKey: ['pending-goals']})
  }

  return (
      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar Meta</DialogTitle>
              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione as acitividades que você deseja realizar durante a semana
            </DialogDescription>
          </div>

          <form 
            onSubmit={handleSubmit(handleCreateGoal)}
            className="flex-1 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual é a sua meta?</Label>
                <Input 
                  id="title"
                  autoFocus
                  placeholder="Praticar esportes, meditar, etc..." 
                  {...register('title')}
                />
                {formState.errors.title && (
                  <p className="text-red-400 text-sm">{formState.errors.title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="quantity">Quantas vezes por semana?</Label>
                <Controller
                  control={control}
                  defaultValue={3}
                  name="desiredWeeklyFrequency" 
                  render={({field}) => {
                    return (
                      <RadioGroup id="quantity" onValueChange={field.onChange} value={String(field.value)}>
                        <RadioGroupItem value="1" className="" id="quantity-1">
                          <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                            1x na semana
                            </span>
                            <span className="text-lg leading-none">🥱</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="2" className="" id="quantity-2">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            2x na semana
                          </span>
                          <span className="text-lg leading-none">😉</span>
                        </RadioGroupItem>
                        <RadioGroupItem value="3" className="" id="quantity-3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            3x na semana
                          </span>
                          <span className="text-lg leading-none">😎</span>
                        </RadioGroupItem> 
                        <RadioGroupItem value="4" className="" id="quantity-3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            4x na semana
                          </span>
                          <span className="text-lg leading-none">😜</span>
                        </RadioGroupItem> 
                        <RadioGroupItem value="5" className="" id="quantity-3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            5x na semana
                          </span>
                          <span className="text-lg leading-none">😉</span>
                        </RadioGroupItem> 
                        <RadioGroupItem value="6" className="" id="quantity-3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            6x na semana
                          </span>
                          <span className="text-lg leading-none">🏃</span>
                        </RadioGroupItem> 
                        <RadioGroupItem value="7" className="" id="quantity-3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            7x na semana
                          </span>
                          <span className="text-lg leading-none">🔥</span>
                        </RadioGroupItem> 
                      </RadioGroup>
                    )
                  }}
                  />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button className="flex-1" variant="secondary">
                  Fechar
                </Button>
              </DialogClose> 
              <Button className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
  )
}