defmodule MotorRepairBackendWeb.AuthPlugs do
  use MotorRepairBackendWeb, :controller
  import Plug.Conn

  alias MotorRepairBackendWeb.Guardian
  alias MotorRepairBackend.Repo
  alias MotorRepairBackend.ProjectContext.Project

  @cannot_find_user "cannot find user."
  @root_is_needed "root is needed."
  @admin_is_needed "admin is needed."
  @project_is_disabled "project is disabled."

  @api_version "/api/v1/"

  # 验证登陆用户是否为根用户(root)
  def auth_root(conn, _) do
    resource = MotorRepairBackendWeb.Guardian.Plug.current_resource(conn)
    if is_nil(resource) do
      conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@cannot_find_user}") |> halt()
    else
      case resource.is_root do
        true -> conn
        false -> conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@root_is_needed}") |> halt()
      end
    end
    
  end

  # 验证登陆用户是否为管理员用户(admin),root用户将直接通过验证
  def auth_admin(conn, _) do
    resource = MotorRepairBackendWeb.Guardian.Plug.current_resource(conn)
    if is_nil(resource) do
      conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@cannot_find_user}") |> halt()
    else
      case resource.is_admin || resource.is_root do
        true -> conn
        false -> 
          conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@admin_is_needed}") |> halt()
      end
    end
  end

  # 验证登陆用户所属项目是否可用，root用户将直接通过验证
  def project_active(conn, _) do
    resource = MotorRepairBackendWeb.Guardian.Plug.current_resource(conn)
    if is_nil(resource) do
      conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@cannot_find_user}") |> halt()
    else
      case resource.is_root do
        false ->
          project = Repo.get(Project, resource.project_id)
          case project.actived do
            true -> conn
            false -> conn |> redirect(to: "#{@api_version}/plug_auth_failure/#{@project_is_disabled}") |> halt()
          end
        true -> conn
      end
    end
  end

end