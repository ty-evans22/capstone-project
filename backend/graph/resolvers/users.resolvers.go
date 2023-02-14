package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.24

import (
	"context"

	"git.las.iastate.edu/SeniorDesignComS/2023spr/sop/auth"
	errs "git.las.iastate.edu/SeniorDesignComS/2023spr/sop/errors"
	"git.las.iastate.edu/SeniorDesignComS/2023spr/sop/graph/generated"
	"git.las.iastate.edu/SeniorDesignComS/2023spr/sop/graph/model"
)

// ChangePassword is the resolver for the changePassword field.
func (r *mutationResolver) ChangePassword(ctx context.Context, userID string, newPassword string) (bool, error) {
	authUser := auth.GetUserFromContext(ctx)
	if authUser == nil {
		return false, errs.NewUnauthorizedError(ctx, "You must login to change your password.")
	}

	if authUser.ID != userID && !auth.IsAdmin(authUser) {
		return false, errs.NewForbiddenError(ctx, "You do not have permission to change other users' passwords.")
	}

	err := r.UserService.ChangeUserPassword(ctx, userID, newPassword)
	if err != nil {
		return false, err
	}

	return true, nil
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	authUser := auth.GetUserFromContext(ctx)
	if authUser == nil {
		return nil, nil
	}

	user, err := r.UserService.GetUserById(ctx, authUser.ID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
