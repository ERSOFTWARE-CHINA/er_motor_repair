defmodule MotorRepairBackend.RepairInfoContext.RepairInfo do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.PartsExpense
  alias MotorRepairBackend.ProjectContext.Project


  schema "repair_info" do
    field :no, :string                         # 单号
    field :type, :string                       # 类型
    field :time_cost, :float, default: 0       # 工时费用
    field :consultant, :string                 # 服务顾问
    field :entry_date, :date                   # 进场时间
    field :return_date, :date                  # 预交车时间
    field :items, :string                      # 项目（如洗车、质检、带走旧件等）
    field :customer_comment, :string             # 客户描述
    field :repairman_comment, :string            # 维修工描述
    field :advise, :string                       # 维修建议
    field :mileage, :float                     # 进场里程
    field :next_mileage, :float                # 下次保养里程
    field :next_date, :date                    # 下次保养日期
    field :agent, :string                      # 送修人
    field :agent_mobile, :string               # 送修人手机

    belongs_to :project, Project, on_replace: :nilify
    has_many :parts_cost, PartsExpense, on_delete: :delete_all, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(repair_info, attrs) do
    repair_info
      |> cast(attrs, [:no, :type, :time_cost, :consultant, :entry_date, :return_date, :items, :customer_comment, :repairman_comment, :advise, :mileage, :next_mileage, :next_date, :agent, :agent_mobile])
      |> validate_required([:no, :type])
      |> unique_constraint(:no)
  end
end
