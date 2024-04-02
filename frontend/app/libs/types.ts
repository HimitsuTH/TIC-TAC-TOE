import { z } from "zod";

export const GameSettingSchema = z.object({
    player1: z.string().trim().min(1, { message: "Required" }),
    player2: z.string().trim().min(1, { message: "Required" }).optional(),
    size: z.number().positive().min(3,{message: "Please enter size more than 2"}).max(10,{message:"Please enter size less than 10"}).optional(),
  })

export type GameSetting = z.infer<typeof GameSettingSchema>;