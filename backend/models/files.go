package models

import (
	"context"

	"git.las.iastate.edu/SeniorDesignComS/2023spr/sop/graph/model"
)

type FileService interface {
	// Gets a list of all folders in the root folder
	GetAllFolders(ctx context.Context) ([]*model.Folder, error)

	// Gets a list of all contents in a folder
	GetFolderContents(ctx context.Context, id string) ([]model.FolderItem, error)
}