import model from '../db/models';

const {
  QuestionUpvote,
  QuestionDownvote,
  AnswerDownvote,
  AnswerUpvote,
  Answer,
  User,
  sequelize,
} = model;

export const questionQueryOptions = (
  currentUser = -1,
  attributesInclude = []
) => ({
  distinct: true,
  attributes: {
    include: [
      ...attributesInclude,
      [
        sequelize.fn(
          'EXISTS',
          sequelize.literal(
            `SELECT * FROM "QuestionUpvotes" WHERE "Question".id = "QuestionUpvotes"."questionId" AND "QuestionUpvotes"."userId" = ${currentUser}`
          )
        ),
        'currentUserUpvoted',
      ],
      [
        sequelize.fn(
          'EXISTS',
          sequelize.literal(
            `SELECT * FROM "QuestionDownvotes" WHERE "Question".id = "QuestionDownvotes"."questionId" AND "QuestionDownvotes"."userId" = ${currentUser}`
          )
        ),
        'currentUserDownvoted',
      ],
    ],
  },
  include: [
    {
      model: QuestionUpvote,
      as: 'questionUpvotes',
    },
    {
      model: QuestionDownvote,
      as: 'questionDownvotes',
    },
    {
      model: User,
      as: 'user',
    },
    {
      model: Answer,
      as: 'answers',
      attributes: {
        include: [
          [
            sequelize.fn(
              'EXISTS',
              sequelize.literal(
                `SELECT * FROM "AnswerUpvotes" WHERE answers.id = "AnswerUpvotes"."answerId" AND "AnswerUpvotes"."userId" = ${currentUser}`
              )
            ),
            'currentUserUpvoted',
          ],
          [
            sequelize.fn(
              'EXISTS',
              sequelize.literal(
                `SELECT * FROM "AnswerDownvotes" WHERE answers.id = "AnswerDownvotes"."answerId" AND "AnswerDownvotes"."userId" = ${currentUser}`
              )
            ),
            'currentUserDownvoted',
          ],
        ],
      },
      include: [
        {
          model: AnswerUpvote,
          as: 'answerUpvotes',
        },
        {
          model: AnswerDownvote,
          as: 'answerDownvotes',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    },
  ],
});
