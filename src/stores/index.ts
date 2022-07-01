import { RiddleId, riddles } from '@/utils';
import { defineStore } from 'pinia'

export const useRiddlesStore = defineStore('riddle', {
  state: () => {
    return {
      riddles: JSON.parse(JSON.stringify(riddles)),
    };
  },
  actions: {
    updateResponse(riddleId: RiddleId, response: string) {
        this.riddles.find((r: Riddle) => r.id === riddleId)!.response = response;
    }
  },
})