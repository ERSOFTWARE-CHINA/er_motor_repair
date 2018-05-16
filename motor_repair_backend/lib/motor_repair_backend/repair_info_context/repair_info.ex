defmodule MotorRepairBackend.RepairInfoContext.RepairInfo do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.PartsCost
  alias MotorRepairBackend.RepairInfoContext.TimeCost
  alias MotorRepairBackend.ProjectContext.Project
  alias MotorRepairBackend.CarMessageContext.CarMessage
  alias MotorRepairBackend.Utils.GetDate

  schema "repair_info" do
    field :no, :string                                      # 单号
    field :type, :string                                    # 类型
    # field :time_cost, :float, default: 0                    # 工时费用
    field :consultant, :string                              # 服务顾问
    field :entry_date, :date                                # 进场时间
    field :return_date, :date                               # 预交车时间
    field :items, :string                                   # 项目（如洗车、质检、带走旧件等）
    field :customer_comment, :string                        # 客户描述
    field :repairman_comment, :string                       # 维修工描述
    field :advise, :string                                  # 维修建议
    field :mileage, :float                                  # 进场里程
    field :next_mileage, :float                             # 下次保养里程
    field :next_date, :date                                 # 下次保养日期
    field :agent, :string                                   # 送修人
    field :agent_mobile, :string                            # 送修人手机
    field :status, :boolean, default: false                 # 维修单状态

    belongs_to :project, Project, on_replace: :nilify
    belongs_to :car_message, CarMessage, on_replace: :nilify
    has_many :parts_cost, PartsCost, on_delete: :delete_all, on_replace: :delete
    has_many :time_cost, TimeCost, on_delete: :delete_all, on_replace: :delete
    

    timestamps()
  end

  @doc false
  def changeset(repair_info, attrs) do
    repair_info
      |> cast(attrs, [:no, :type, :consultant, :entry_date, :return_date, :items, :customer_comment, :repairman_comment, :advise, :mileage, :next_mileage, :next_date, :agent, :agent_mobile, :status])
      |> validate_required([:no, :type])
      |> validate_required(:status)
      |> validate_no_format()
      |> unique_constraint(:no)
  end

  # 单号格式验证，11位数字的单号为正确格式，且最大值为"yyyymmdd<>999"
  defp validate_no_format(changeset) do
    no = get_field(changeset, :no)  
    if Regex.match?(~r/[0-9]{8}/,no) && no <= GetDate.get_date_str()<>"999" do
      changeset
    else
      add_error(changeset, :no, "invalid format")
    end
  end

end
