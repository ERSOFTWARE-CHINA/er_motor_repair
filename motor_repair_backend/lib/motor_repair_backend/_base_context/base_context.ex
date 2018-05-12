defmodule MotorRepairBackend.BaseContext do

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo
  alias MotorRepairBackendWeb.Guardian
  import MotorRepairBackend.SearchTerm
  import Ecto.Query.API, only: [like: 2, field: 2, max: 1]

  alias MotorRepairBackend.ProjectContext.Project

  defmacro __using__(_opts) do
    quote do
      alias MotorRepairBackend.Repo
      import MotorRepairBackend.BaseContext
      import MotorRepairBackend.SearchTerm
    end
  end

  def list_all(struct, conn) do
    struct
    |> add_belongs_to(conn)
    |> Repo.all
  end

  def get_pagination(query, params, conn) do
    query
    |> add_belongs_to(conn)
    |> query_paginate(params)
  end

  def get_by_id(struct, id, conn, preload_list \\ []) do
    struct
    |> add_belongs_to(conn)
    |> query_preload(preload_list)
    |> Repo.get(id)
    |> case do
      nil -> {:error, :not_found}
      entity -> {:ok, entity}
    end
  end

  def get_by_name(query,  conn, field_value) do
    query
    |> add_belongs_to(conn)
    |> Repo.get_by(field_value)
    |> case do
      nil -> {:error, :not_found}
      entity -> {:ok, entity}
    end
  end

  def get_by_name(query, field_value) do
    query
    |> Repo.get_by(field_value)
    |> case do
      nil -> {:error, :not_found}
      entity -> {:ok, entity}
    end
  end

  def save_create(changeset, conn) do
    Repo.insert(changeset |> set_belongs_to(conn))
  end

  def save_update(changeset, conn) do
    Repo.update(changeset |> set_belongs_to(conn))
  end

  def delete_by_id(struct, id, conn) do
    struct
    |> get_by_id(id, conn)
    |> case do
      {:error, :not_found} -> {:error, :not_found}
      {:ok, entity} -> Repo.delete(entity)
    end
  end

  # 获取某字段的最大值
  def get_max(struct, field_atom, conn) do
    query = from p in struct, select: max(field(p, ^field_atom))
    query 
    |> add_belongs_to(conn)
    |> Repo.one
  end

  def change(struct, entity) do
    struct.changeset(entity, %{})
  end

  # 添加所属项目作为查询条件，不对root用户有效
  defp add_belongs_to(query, conn) do
    resource = MotorRepairBackendWeb.Guardian.Plug.current_resource(conn)
    case resource.is_root do
      true ->
        query
      false ->
        query 
        |> query_equal(%{ "project_id" => resource.project_id }, "project_id")
    end
  end

  defp set_belongs_to(changeset, conn) do
    resource = Guardian.Plug.current_resource(conn)
    case resource.is_root do
      false ->
        project = Repo.get(Project, resource.project_id)
        project_changeset = change(Project, project)
        Ecto.Changeset.put_assoc(changeset, :project, project_changeset)
      true -> changeset
    end
  end
end
  