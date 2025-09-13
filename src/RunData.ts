// Uno por run
export type RunData = {
  u: number           // userId: Usuario asociado al run
  l: number           // levelId: ID del Nivel \in {1, 2, 3, 4}.
  s: number           // score: Puntaje del usuario
  c: boolean          // completed: Run exitoso?
  t: number           // time: Duración del run

  //  Uno por pregunta respondida
  a: [number, number, number, number, boolean][] // [questionId, assertionId, formId, answerTime, isCorrect]
}