import dbConnect from '@/utils/dbConnect';
import Question, { QuestionDocument } from '@/models/question';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export const GET = async () => {
  try {
    await dbConnect();
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question: QuestionDocument = await Question.findOne().skip(random).exec();
    return NextResponse.json({
      theme: question.theme,
      clue: question.clue,
      label: question.label,
      answers: question.answers,
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json(null, { status: 500 });
  }
};
