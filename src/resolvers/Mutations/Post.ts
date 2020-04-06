import { idArg, stringArg, mutationField } from 'nexus'
import { getUserId } from '../../utils/constants'

export const createDraft = mutationField('createDraft', {
  type: 'Post',
  args: {
    title: stringArg(),
    content: stringArg({ nullable: true }),
  },
  resolve: (_parent, { title, content }, ctx) => {
    const userId = getUserId(ctx)
    return ctx.prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { id: userId } },
      },
    })
  },
})

export const deletePost = mutationField('deletePost', {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: (_parent, { id }, ctx) => {
    return ctx.prisma.post.delete({
      where: {
        id,
      },
    })
  },
})

export const publish = mutationField('publish', {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: (_parent, { id }, ctx) => {
    return ctx.prisma.post.update({
      where: { id },
      data: { published: true },
    })
  },
})
